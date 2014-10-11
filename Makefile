# A Makefile for myschoolishness

production: build stage
ifneq (,$(wildcard prod_config.txt))
		mv ./config.json ./local_config.txt
		mv ./prod_config.txt ./config.json
else
		echo 'prod_config.txt does not exist, not moving config files'
endif

local:
ifneq (,$(wildcard local_config.txt))
		mv ./config.json ./prod_config.txt
		mv ./local_config.txt ./config.json
else
		echo 'local_config.txt does not exist, not moving config files'
endif

build:
	cd myschoolishness; \
	sencha app build -c package
stage:
	rm -R ./prod
	mkdir ./prod
	cp -R ./myschoolishness/build/package/myschoolishness/* ./prod
	