
function main(allusers, myHitCounter){
    return `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
        <title>Acme User Crud - Seq</title>
    </head>
    <body>
    <div class='container'>
    <h1>Acme Users CRUD-SEQ</h1>
    <b>Weekend Project by Ami Domadia 1901-Flex-NY</b><br>
    <b>Submitted: 2/18/2019</b>

    <ul class='list-group'>
    ${allusers.map(user=>
    `<li><form method='POST' action='/${user.id}?_method=DELETE'>
            <h2>${user.first} ${user.last}</h2>
            <button type="submit" class="btn-danger">DELETE</button>
    </form></li>`).join('')}
    </ul>
    <form>
        <label for="first">First Name</label>
        <input type="text" name="first" />
        <label for="last">Last Name</label>
        <input type="text" name="last" />
        <button type="submit" formmethod="POST">Create</button>
        <button type="cancel" formmethod="GET">Cancel</button>
    </form></br>
    <b><u>Total Site Views:${myHitCounter}</u></b>
    </div>
    </body>
    </html>`
}

module.exports = main