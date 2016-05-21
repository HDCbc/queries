#!/bin/bash
#
set -euo pipefail nounset

DIRECTIVES="../directives"
QUERY_LIST=$(find ../queries/ -regextype posix-extended -regex ".*./HDC-[0-9]{4}.*\.js")

#cd ${DIRECTIVES}
for q in ${QUERY_LIST}
do
	FILE=${q#../*/*}
	FULL=${FILE%.*}
	NAME=${FILE%%_*}
	DESC=${FULL#*_}
	SAVE=${NAME}.json
	HERE=${DIRECTIVES}/${SAVE}
	if [ -f ./${HERE} ]
	then
		echo "${SAVE} already exists"
	else
		if( grep 'emitter.ratio' ${q})
		then
			(
				echo -e '{'
				echo -e '\t"type"         : "QUERY",'
				echo -e '\t"name"         : "'${NAME}_${DESC}'",'
				echo -e '\t"title"        : "'${NAME}'",'
				echo -e '\t"description"  : "'${DESC}'",'
				echo -e '\t"display_name" : "'${DESC}'",'
				echo -e '\t"query_type"   : "RATIO",'
				echo -e '\t"map"          : "queries/'${FULL}'.js",'
				echo -e '\t"reduce"       : "queries/ReduceRatio.js"'
				echo -e '}'
			) > ${HERE}
		else
			(
				echo -e '{'
				echo -e '\t"type"         : "QUERY",'
				echo -e '\t"name"         : "'${NAME}_${DESC}'",'
				echo -e '\t"title"        : "'${NAME}'",'
				echo -e '\t"description"  : "'${DESC}'",'
				echo -e '\t"display_name" : "'${DESC}'",'
				echo -e '\t"query_type"   : "STRATIFIED",'
				echo -e '\t"map"          : "queries/'${FULL}'.js",'
				echo -e '\t"reduce"       : "queries/ReduceCount.js"'
				echo -e '}'
			) > ${HERE}

		fi
		echo "${SAVE} successfully created"
	fi
done
