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
