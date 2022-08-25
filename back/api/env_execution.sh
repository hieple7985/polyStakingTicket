if [ $1 == "dev" ]; then
    cp env/.env.dev .env
elif [ $1 == "stage" ]; then
    cp env/.env.test .env
fi