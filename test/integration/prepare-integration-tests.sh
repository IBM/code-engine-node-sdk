#!/bin/bash
##################################################
# Licensed Materials - Property of IBM
# IBM Cloud Code Engine, 5900-AB0
# © Copyright IBM Corp. 2020, 2023
# US Government Users Restricted Rights - Use, duplication or
# disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
##################################################

set -e

# Create two new self-signed certificates using openssl
# The certs are used to verify TLS secret creations and updates
echo "Creating dummy certificates to verify TLS secrets ..."
openssl req -newkey ed25519 -nodes -keyout ./test/integration/domain.key -out ./test/integration/domain.csr -config ./test/integration/sample_cert.conf
openssl x509 -signkey test/integration/domain.key -in test/integration/domain.csr -req -days 365 -out test/integration/domain.crt
echo "Creating dummy certificates to verify TLS secrets [done]"
echo ""

# Create two private EC keys using openssl
# The SSH keys are used to verify SSH secret creations and updates
echo "Creating dummy SSH keys to verify SSH secrets ..."
openssl ecparam -name prime256v1 -genkey -noout -out ./test/integration/sshkey.pem
echo "Creating dummy certificates to verify SSH secrets [done]"
echo ""


function get_repo {
    if [ ! -d "$apiDirectory" ]; then
        printf "Cloning github.ibm.com/coligo/api...\n"
        git clone https://github.ibm.com/coligo/api.git "$apiDirectory"
    else
        printf "github.ibm.com/coligo/api already cloned, getting latest...\n"
        cd "$apiDirectory"
        if [[ $(git status --porcelain) ]]; then
            printf "Local working tree contains changes... stashing them\n"
            git stash
        fi
        git checkout main
        git pull
        cd "$rootDirectory"
    fi
}

echo ""
echo "----------------------------------"
echo "Getting test dependencies ..."
echo "----------------------------------"
rootDirectory=$(pwd)
apiDirectory=$rootDirectory/api
get_repo
