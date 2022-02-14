# World Marine satellite imagery

Eric Lawrey – 10 Feb 2022

Australian Institute of Marine Science

This repository contains scripts for processing Sentinel 2 imagery using the Google Earth 
Engine and the Python scripts for subsequent post processing
of the imagery. 

## s2 composites
These contain manually created composite images sorted into regions based on 
[Global reef regions](https://github.com/eatlas/World_AIMS_Reef-regions).

## Change log
`2022-02-14` - *v1.0* - Initial release of the s2Utils for use in the 
`CS_AIMS_Coral-Sea-Features_Imagery` dataset.

## Setup

A low tech approach to getting the code in the GEE editor is simply copying and
pasting the code from GitHub. This approach is only suitable if you want just a few files,
otherwise it is much better to clone the whole repository over. 

### Clone this repository into Google Earth Engine
1. Create an empty repository in GEE using `Scripts\NEW\Repository`. Name the 
repository `World_AIMS_Marine-satellite-imagery`. Technically the names don't need
to match but it could get confusing if the names don't match.

2. On you local machine clone the repository from GitHub. 
```
git clone https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```

3. Change into the newly downloaded empty repository, cloned from GEE. 
```
cd World_AIMS_Marine-satellite-imagery
```

4. Switch the push origin to the GEE repository. Find the path to your empty
GEE repository by hovering over the new repository and select the `Configure` 
button (it looks like a small cog). 
This will show the command to clone the new repository to your local machine. For
```
git clone https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```
We are interesting in the path to the repository. Add this as the push
origin.
```
git remote set-url origin https://earthengine.googlesource.com/users/<username>World_AIMS_Marine-satellite-imagery
```
5. Push the repository up to GEE.
```
git push 
```
6. Refresh the repositories in GEE. There is a refresh button next to the `NEW` button.
You can now make changes on your local machine and push them up to GEE. If you make changes
on GEE you will need to perform a `git pull`. 

### Pushing code back to GitHub
To push code back to GitHub instead of GEE you can simply use.
```
git push https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```


### Setting up pushing to both GitHub and Google Earth Engine at same time
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

## Tagging new versions of the library
When there is a new release version of this dataset or the utility libraries (s2Utils.js) then
update the version number in the library, commit this, then add a tag to the repo.
```
git tag -a v1.1 -m "Stable update for CS_AIMS_Coral-Sea-Features_Imagery dataset"
```