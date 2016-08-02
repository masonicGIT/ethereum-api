#!/bin/bash
#
# Gethup.sh - Spawn a local geth node
#
# Influenced by:
#
#     https://github.com/ethersphere/eth-utils
#
# Usage:
#
#     bash ./gethup.sh < ROOT_DIR > < INSTANCE_NAME >
#

ROOT_DIR=$1
ID=$2

GETH=geth

DATE=`date "+%c%y%m%d-%H%M%S"|cut -d ' ' -f 5`
CURRENT_DIR=$ROOT_DIR/data/$ID
LOG=$ROOT_DIR/log/$ID.$DATE.log
LINK_LOG=$ROOT_DIR/log/$ID.current.log
STABLE_LOG=$ROOT_DIR/log/$ID.log
PASSWORD=$ID
PORT=311$ID
RPCPORT=82$ID

mkdir -p $ROOT_DIR/data
mkdir -p $ROOT_DIR/log
ln -sf "$LOG" "$LINK_LOG"

# If an account does not exist, create one
# use the ID as the password

if [ ! -d "$ROOT_DIR/keystore/$ID" ]; then
  echo create an account with password $ID
  mkdir -p $ROOT_DIR/keystore/$ID
  $GETH --datadir $CURRENT_DIR --password <(echo -n $ID) account new

# create account with password 00, 01, ...
  # note that the account key will be stored also separately outside
  # datadir
  # this way you can safely clear the data directory and still keep your key
  # under `<rootdir>/keystore/dd

  cp -R "$CURRENT_DIR/keystore" $ROOT_DIR/keystore/$ID
fi

echo "Copying keys $ROOT_DIR/keystore/$ID $CURRENT_DIR/keystore"
cp -R $ROOT_DIR/keystore/$ID/keystore/ $CURRENT_DIR/keystore/

BZZKEY=`$GETH --datadir=$CURRENT_DIR account list|head -n1|perl -ne '/([a-f0-9]{40})/ && print $1'`

# bring up node `dd` (double digit)
# - using <rootdir>/<dd>
# - listening on port 303dd, (like 30300, 30301, ...)
# - with the account unlocked
# - launching json-rpc server on port 81dd (like 8100, 8101, 8102, ...)
echo "$GETH --datadir=$CURRENT_DIR \
  --identity="$ID" \
  --port=$PORT \
  --rpc --rpcport=$RPCPORT --rpccorsdomain='*' $* \
  2>&1 | tee "$STABLE_LOG" > "$LOG" &
"

$GETH --datadir=$CURRENT_DIR \
  --identity="$ID" \
  --port=$PORT \
  --rpc --rpcport=$RPCPORT --rpccorsdomain='*' $* \
   2>&1 | tee "$STABLE_LOG" > "$LOG" &

