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
	/Users/ssaad29/bin/Sencha/Cmd/5.0.3.324/sencha app build -c production
stage:
	rm -R ./prod
	mkdir ./prod
	cp -R ./myschoolishness/build/production/myschoolishness/* ./prod
	