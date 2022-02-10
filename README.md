# World Marine satellite imagery

Eric Lawrey – 10 Feb 2022

Australian Institute of Marine Science

This repository contains scripts for processing Sentinel 2 imagery using the Google Earth 
Engine and the Python scripts for subsequent post processing
of the imagery. 

# s2 composites
These contain manually created composite images sorted into regions based on 
[Global reef regions)[https://github.com/eatlas/World_AIMS_Reef-regions].

# Setting up pushing to both GitHub and Google Earth Engine
The following are some of the commands needed to edit this repository locally, but to
be able to push updates to both Google Earth Engine and GitHub.

Part of the required setup is to allow Google Source to have access to your Google Account.
I was prompted for this when I cloned the original git repository from GEE.

These instructions were based on [Working with multiple remote repositories](https://jigarius.com/blog/multiple-git-remote-repositories)

Create a new remote called "all" with the URL of the primary repo. It was unnecessary for me
because this was already set when I cloned from GEE. This might be different when setting up
from GitHub.
```
git remote add all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```

Re-register the remote as a push URL. 
```
git remote set-url --add --push all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```

Add a push URL to a remote. This means that "git push" will also push to this git URL.
```
git remote set-url --add --push all https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```

Push local changes to both GEE and GitHub. GEE seems to display and use the master branch.
```
git push all master
```
The .git/config file should look similar to the following (except with your Google username).
Note: I initially pushed to the `main` branch, unfortunately the Google Earth Engine seems to
only update from the `master` branch.
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
[branch "master"]
	remote = origin
	merge = refs/heads/master
```