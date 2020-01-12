.PHONY: clean spec

all: spec

spec:
	$(MAKE) -C spec

clean: clean-spec

clean-spec:
	$(MAKE) -C spec clean