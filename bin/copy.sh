# Do the following instead of an arry to be POSIX compliant
# http://unix.stackexchange.com/questions/102891/posix-compliant-way-to-work-with-a-list-of-filenames-possibly-with-whitespace

ASSETS="
node_modules/fullcalendar/dist/fullcalendar.min.css
CNAME
favicon.ico
"

set -f; IFS='
'                           # turn off variable value expansion except for splitting at newlines
for file in $ASSETS; do
	set +f; unset IFS       # restore globbing and field splitting at all whitespace
	cp -vf "$file" ./dist/
done
set +f; unset IFS           # do it again in case $ASSETS was empty