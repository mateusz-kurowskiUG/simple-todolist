#!/bin/bash

files=$(ls *.yaml)

for file in ${files}; do
    kubectl delete -f "$file" || true
    kubectl apply -f "$file"
done

# Wait for all pods to be in the Running state
sleep 1
for i in {1..10}; do
    all_running=true
    for pod in $(kubectl get pods --no-headers -o custom-columns=":metadata.name"); do
        status=$(kubectl get pod $pod -o jsonpath='{.status.phase}')
        if [ "$status" != "Running" ]; then
            all_running=false
            break
        fi
    done
    if [ "$all_running" = true ]; then
        break
    fi
    echo "Waiting for pods to be in Running state..."
    sleep 5
done

# Port forwarding
kubectl port-forward service/keycloak 8080:8080 &
kubectl port-forward service/frontend 3000:3000 &
kubectl port-forward service/backend 5000:5000 &
# kubectl port-forward service/backend 5000:5000 &

wait
