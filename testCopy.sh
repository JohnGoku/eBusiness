#!/bin/bash

#Skript f�hrt apiTest.py aus und kopiert anschlie�end die notwendigen Dateien f�r die Webseite an den passenden Ort


if(python apiTest.py)
	then
	cp -f *.html *.pdf /var/www/html
fi