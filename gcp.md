make sure you are inside image-rescaler
git pull
docker build -t gcr.io/pmttr-261321/permutator:v3  .
docker push gcr.io/pmttr-261321/permutator:v3
kubectl set image deployment/permut-web permutator=gcr.io/pmttr-261321/permutator:v3
