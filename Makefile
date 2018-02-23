sources = manifest.json background.js
name = tab-count.zip

all: $(name)

$(name): $(sources)
	-rm -f $(name)
	zip $@ $^

install: all
	firefox $(name)

clean:
	-rm -f $(name)
