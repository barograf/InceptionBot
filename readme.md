# InceptionBot

![Screenshot 1](https://raw.githubusercontent.com/barograf/InceptionBot/master/screenshots/1.png)

## Requirements

This solution was tested only on a Mac computer with Docker Machine. It may work for other specs though.
- Mac
- Docker
- Docker Compose
- Docker Machine
- VirtualBox installed
- VirtualBox ExtensionPack installed
- Custom boot2docker image containing camera drivers https://github.com/Alexoner/boot2docker/releases/download/v17.06.0-ce-usb-rc5/boot2docker.iso

## Camera in docker

Follow those steps in order to enable camera in docker:
- Create docker machine using custom boot2docker image
- Enable USB Controller for that machine (you can use VirtualBox GUI for that)
- Attach camera to machine with command `VBoxManage controlvm "machine-name" webcam attach .1`
- Now you can start your camera container

## Installation

First of all, set those environmental variables:
```
HUBOT_SLACK_TOKEN=your-slack-chat-bot-token
HUBOT_VERSION=1
CAMERA_VERSION=1
OPENCPU_VERSION=1
```

Then you can run those commands:
- `make build_hubot` - builds a robot image
- `make build_opencpu` - builds an OpenCPU image
- `make build_camera` - builds a camera image
- `make build` - builds all images
- `make start` - runs all containers
- `make stop` - stops all containers
- `make down` - stops all containers and removes them

## License

MIT
