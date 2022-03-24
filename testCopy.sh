#!/bin/bash

#Skript führt apiTest.py aus und kopiert anschließend die notwendigen Dateien für die Webseite an den passenden Ort


if(python apiTest.py)
	then
	echo "test" >> ../../test.txt
#	cp -f *.html *.pdf /var/www/html
fi