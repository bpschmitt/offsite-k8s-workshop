#!/bin/bash

if [ $# -eq 0 ]
then
    echo "Please supply an app name."
    echo "Usage: ./deploy-apps.sh myAppName"
    exit 1
else
    sed -i "s/REPLACE_ME/${1}/g" ./nodejs_lic/nodejs_lic.yaml
fi

kubectl apply -f crasher/crasher.yaml -n demo
kubectl apply -f nginx/deployment-nginx.yaml -n demo
kubectl apply -f prometheus_metrics/pod.yaml -n demo
kubectl apply -f nodejs_lic/nodejs_lic.yaml -n demo

exit 0
