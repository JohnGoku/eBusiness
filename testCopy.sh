#!/bin/bash                                                                                                                                                                                                                                                                                                                                                                                                                                                                               #Skript fuehrt apiTest.py aus und kopiert anschliessend die notwendigen Dateien fuer die Webseite an den passenden Ort                                                                                                                                                                                                                                                                                                                                                                    function apis {                                                                                                                                                                                                                                  python3 - <<END                                                                                                                                                                                                                          from python.apiTests import checkIfAvailable                                                                                                                                                                                                 checkIfAvailable()                                                                                                                                                                                                                           END                                                                                                                                                                                                                                          }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         working= apis                                                                                                                                                                                                                                echo $working                                                                                                                                                                                                                                echo apis                                                                                                                                                                                                                                    if($working)                                                                                                                                                                                                                                         then                                                                                                                                                                                                                                         echo "test" >> ../../test.txt                                                                                                                                                                                                        #       cp -f *.html *.pdf /var/www/html                                                                                                                                                                                                     fi  #!/bin/bash

#Skript fuehrt apiTest.py aus und kopiert anschliessend die notwendigen Dateien fuer die Webseite an den passenden Ort

function apis {
    python3 - <<END
from python.apiTests import checkIfAvailable
checkIfAvailable()
END
}

working= apis
echo $working
echo apis
if($working)
        then
        echo "test" >> ../../test.txt
#       cp -f *.html *.pdf /var/www/html
fi