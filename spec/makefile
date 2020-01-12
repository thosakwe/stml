pages = front_page.md about.md syntax.md
outputs = spec.pdf spec.html

.PHONY: clean

all: $(outputs)

clean:
	rm -f *.pdf *.html combined.md

combined.md: $(pages)
	bash ./cat.sh $^ > $@

$(outputs): combined.md
	pandoc -o $@ $<