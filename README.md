# World Marine satellite imagery

Eric Lawrey – 10 Feb 2022

Australian Institute of Marine Science

This repository contains scripts for processing Sentinel 2 imagery using the Google Earth 
Engine and the Python scripts for subsequent post processing
of the imagery. 

# Setting up pushing to both GitHub and Google Earth Engine
The following are some of the commands needed to edit this repository locally, but to
be able to push updates to both Google Earth Engine and GitHub.

Part of the required setup is to allow Google Source to have access to your Google Account.
I was prompted for this when I cloned the original git repository from GEE.

```batch
# From https://github.com/eatlas/World_AIMS_Marine-satellite-imagery
# Create a new remote called "all" with the URL of the primary repo. (Unnecessary because this was already
# set when I cloned from GEE)
# git remote add all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery

# Re-register the remote as a push URL. 
# git remote set-url --add --push all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery

# Add a push URL to a remote. This means that "git push" will also push to this git URL.
git remote set-url --add --push all https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git

# Check the .git/config file to ensure the setup looks good.

# Replace BRANCH with the name of the branch you want to push.
git push all main
```
The .git/config file should look similar to the following (except with your Google username).
```
[remote "origin"]
	url = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[remote "all"]
	url = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
	fetch = +refs/heads/*:refs/remotes/all/*
	pushurl = https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
	pushurl = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```