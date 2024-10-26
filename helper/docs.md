<!-- @format -->

what do i need for this??

first we need something to store the code coming from github

okay

if its coming from github, i need some api server to hit it

so STEP 1: get api server

now getting code from github need to build it, thus i can use docker for isolated environment, use code can be very big, and i can have parallelism cause i can spin multiple docker container

STEP 2: docker needed (build server)

after building code, i need to upload code into S3 (their build folder) technical term is stream cdoec into S3, after building the container will self destroy thus saving use compute

STEP 3: need of S3, AWS

abhi k liye etna krta hu fer custom proxy lgauga

!# this tells system to use interpreter
/bin/bash gives path to bash shell, whoch will execute it

-y this is flag means all are yes in command line

sub section:-
ye sab krne k bad
docker file ready ki hai or main file hai,
docker file hai container k liye or entry point dene k liye

    main file entry point hai, jo clone krega or fer script file ko run kr dega

now after script from build server

    create S3 bucket
    make it public via policy
    get the bucket name
    add to code
    create IAM user give admin access to it so data can be added via this credentials

next step after creating user in aws
add credentials from there
configure aws configure
then use command
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 010526262167.dkr.ecr.ap-southeast-2.amazonaws.com  
 Login Succeeded

now ready to shot to aws

now configured useer and docker with aws

now locally build image using docker build and then push
docker build -t vercel-100xnvai .

After the build completes, tag your image so you can push the image to this repository:

docker tag vercel-100xnavi:latest 010526262167.dkr.ecr.ap-southeast-2.amazonaws.com/vercel-100xnavi:latest

nexct step

Run the following command to push this image to your newly created AWS repository:

docker push 010526262167.dkr.ecr.ap-southeast-2.amazonaws.com/vercel-100xnavi:latest

next step

STEP 3:
when done with pushing image

go to ECS and create cluster and then try
something something

now i have pushed

STEP: ECS (create cluster service where my containers will run)
create cluster
create task
then inside task assign image URI to it

check if one task is working or not
