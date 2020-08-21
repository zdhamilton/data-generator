# Data Generator

The goal of this tool is to provide an easy approach to generating log, metric, and trace data for popular technologies. 

# Getting Started

## Prerequisites 

* Docker
* settings.json
* Logz.io Account - [Free Trial](https://logz.io/freetrial)

## Installation

Clone this repo.

```
$ git clone https://github.com/zdhamilton/data-generator.git
```
Enter the cloned repo and build the image from the `Dockerfile`. 

```
$ cd data-generator && docker build -t data-generator .
```
Once built, start the image with the following command. If you dont know your account token, you can use [this](https://docs.logz.io/user-guide/tokens/#i-want-to-ship-logs-to-my-account) to find it. Likewise, if you don't know your listener host, you can use [this](https://docs.logz.io/user-guide/accounts/account-region.html#how-to-look-up-your-account-region) to find it. 

```
docker run --rm --name data-generator \
    -v $(pwd)/settings:/project/home/settings \
    -e DATA_TOKEN="<<account token>>" \
    -e DATA_URL="<<listener host>>:8071" \
    data-generator 
```
The previously built image will run with the default generators (essentially all of them). This can be customized by modifying the `settings.json` file found in `./settings`. A brief instructional Wiki can be found [here](https://github.com/zdhamilton/data-generator/wiki) to help you make your own `settings.json` files, and thus your own generators. 