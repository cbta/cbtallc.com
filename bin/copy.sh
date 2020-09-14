# Do the following instead of an arry to be POSIX compliant
# http://unix.stackexchange.com/questions/102891/posix-compliant-way-to-work-with-a-list-of-filenames-possibly-with-whitespace

ASSETS="
node_modules/@fullcalendar/core/main.css fullcalendar.css
node_modules/@fullcalendar/daygrid/main.css daygrid.css
node_modules/@fullcalendar/timegrid/main.css timegrid.css
node_modules/@fullcalendar/list/main.css list.css
CNAME
favicon.ico
"

set -f; IFS='
'                           # turn off variable value expansion except for splitting at newlines
for file in $ASSETS; do
	set +f; unset IFS       # restore globbing and field splitting at all whitespace
	src=$(echo "$file" | cut -d' ' -f1 )
	# -s to suppress cut output if " " delimter doesn't exist
	# which means no dst declared
	dst=$(echo "$file" | cut -s -d' ' -f2 )

	cp -vf "$src" "./dist/$dst"
done
set +f; unset IFS           # do it again in case $ASSETS was empty
