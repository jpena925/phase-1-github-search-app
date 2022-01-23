
const form = document.getElementById('user-search')
const formRepo = document.getElementById('repo-search')
const typeForm = document.getElementById('search')
const name = document.getElementById('user-list')
const repos = document.getElementById('repos-list')


form.addEventListener('click', e => {
    e.preventDefault()
    const userName = e.target.previousElementSibling.value

    fetch(`https://api.github.com/search/users?q=${userName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        removeAllChildren(name)
        removeAllChildren(repos)
        createUser(data)
        
    })
    document.getElementById('github-form').reset()
})

formRepo.addEventListener('click', e => {
    e.preventDefault()
    const repoName = e.target.parentNode.children[0].value
    
    fetch(`https://api.github.com/search/repositories?q=${repoName}`)
    .then(res => res.json())
    .then(data => {
        removeAllChildren(repos)
        removeAllChildren(name)
        data.items.forEach(repo => {
            let repoLink = repo.html_url
            const linkLine = document.createElement('li')
            const newLinkToRepo = document.createElement('a')
            newLinkToRepo.href = repoLink
            newLinkToRepo.innerText = repoLink
            linkLine.append(newLinkToRepo)
            repos.append(linkLine)
        })
        document.getElementById('github-form').reset()
    })
})

function createUser(userdata) {
    const newUserName = document.createElement('h2')
    const newUserPhoto = document.createElement('img')
    const newUserProfileLink = document.createElement('a')
    newUserName.innerText = userdata.items[0].login
    newUserPhoto.src = userdata.items[0].avatar_url
    newUserProfileLink.href = userdata.items[0].html_url
    newUserProfileLink.innerText = `Visit ${userdata.items[0].login} on GitHub!`
    name.append(newUserName, newUserPhoto, newUserProfileLink)
}

function removeAllChildren(parent){
    while(parent.firstChild)
    parent.removeChild(parent.firstChild);
}