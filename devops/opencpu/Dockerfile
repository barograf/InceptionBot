FROM opencpu/base

WORKDIR /app

RUN echo "r <- getOption('repos'); r['CRAN'] <- 'http://cran.us.r-project.org'; options(repos = r);" > ~/.Rprofile \
  && Rscript -e "install.packages('ggplot2')" \
  && Rscript -e "install.packages('caret')" \
  && Rscript -e "install.packages('neuralnet')"

RUN apt-get update && apt-get install -y build-essential git libopenblas-dev libopencv-dev
RUN git clone --recursive https://github.com/dmlc/mxnet/ && cd mxnet && \
    cp make/config.mk . && \
    echo "USE_BLAS=openblas" >>config.mk && \
    make -j$(nproc)

RUN apt-get install -y python-numpy wget unzip
ENV PYTHONPATH /mxnet/python

RUN Rscript -e "install.packages('imager')"

RUN curl -O http://data.mxnet.io/mxnet/data/Inception.zip
RUN mkdir -p /inception
RUN unzip Inception.zip -d /inception

RUN apt-get -y install libcurl4-openssl-dev libssl-dev
RUN apt-get -y install libxml2-dev libxt-dev
RUN Rscript -e "install.packages('devtools', repo = 'https://cran.rstudio.com')"
RUN cd mxnet/R-package && Rscript -e "library(devtools); library(methods); options(repos=c(CRAN='https://cran.rstudio.com')); install_deps(dependencies = TRUE)"
RUN cd mxnet && make rpkg
RUN cd mxnet && R CMD INSTALL mxnet_current_r.tar.gz

COPY apps/opencpu /app
RUN mkdir -p /app/package/data/inception
RUN cp -r /inception/Inception/ /app/package/data/inception
RUN chmod -R a+rwx /app/package/data

RUN R CMD build package \
  && Rscript -e "install.packages('package', repos=NULL, type='source')"
