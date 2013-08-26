Not ready for real usage.

To grab screenshots on Mac:
cd screen-capture
node run-me.js x,y,width,height
Ctrl + c to exit
python anim_encoder.py example

If python complains, make sure there aren't any temporary hidden files in the folder

A different technique by recording actual movies


````
sudo port -v install opencv +python27
python anim_encoder.py example
````