sources = manifest.json background.js
name = tab-count.zip

all: $(name)

$(name): $(sources)
	-rm -f $(name)
	7z u $@ $^

install: all
	firefox $(name)

clean:
	-rm -f $(name)
