recognize <- function(imageobj) {
  require(mxnet)
  require(imager)

  # load model
  model <- mx.model.load("/app/package/data/inception/Inception/Inception_BN", iteration=39)
  mean.img <- as.array(mx.nd.load("/app/package/data/inception/Inception/mean_224.nd")[["mean_img"]])

  # load image
  im <- load.image(imageobj)
  normed <- preproc.image(im, mean.img)

  # predict
  prob <- predict(model, X=normed)

  # get labels
  synsets <- readLines("/app/package/data/inception/Inception/synset.txt")
  max.idx <- max.col(t(prob))

  return(synsets[[max.idx]]);
}

preproc.image <- function(im, mean.img) {
  # crop the image
  shape <- dim(im)
  short.edge <- min(shape[1:2])
  xx <- floor((shape[1] - short.edge) / 2)
  yy <- floor((shape[2] - short.edge) / 2)
  cropped <- crop.borders(im, xx, yy)

  # resize to 224 x 224, needed by input of the model
  resized <- resize(cropped, 224, 224)

  # convert to array (x, y, channel)
  arr <- as.array(resized) * 255
  dim(arr) <- c(224, 224, 3)

  # subtract the mean
  normed <- arr - mean.img

  # Reshape to format needed by mxnet (width, height, channel, num)
  dim(normed) <- c(224, 224, 3, 1)
  return(normed)
}
