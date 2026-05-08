---
layout: Post
title: 'SQL Queries in PHP: Insert, Update, Delete, and Select'
description: 'Explore how to perform basic database operations, such as insert, update, delete, and select queries, using PHP to interact with MySQL databases. Understand how to use PHP to manipulate database records and retrieve data, thereby enhancing the dynamic functionality of web applications.'
date: '2023-11-01'
tags:
  - php
  - mysql
  - web development
  - databases
images:
  - src: /photos/blog-prototype.jpg
    alt: SQL Queries in PHP
---

### Introduction

Managing data is a crucial aspect of any dynamic web application. PHP, coupled with MySQL, provides a powerful toolset to manage data on the web. Let's delve into how PHP can be utilized to perform basic SQL queries like insert, update, delete, and select operations, thereby manipulating and retrieving data from MySQL databases.

### Establishing Database Connection

Before performing any database operations, establishing a connection to the MySQL database is crucial. Utilize `mysqli_connect()` to establish a connection and `mysqli_select_db()` to select the database.

```php
<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "database";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
```

### Performing SQL Queries

#### INSERT Query

Use the INSERT query to add new records to a MySQL table.

```php
$sql = "INSERT INTO users (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')";
if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
```

#### SELECT Query

Retrieve data from the database using the SELECT query.

```php
$sql = "SELECT id, firstname, lastname FROM users";
$result = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($result)) {
    echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
}
```

#### UPDATE Query

Modify existing records using the UPDATE query.

```php
$sql = "UPDATE users SET lastname='Doe' WHERE id=2";
if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}
```

#### DELETE Query

Remove records from the database using the DELETE query.

```php
$sql = "DELETE FROM users WHERE id=1";
if (mysqli_query($conn, $sql)) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . mysqli_error($conn);
}
```

### Closing the Database Connection

Always ensure to close the database connection after performing the necessary operations.

```php
mysqli_close($conn);
```

### Conclusion

Performing SQL queries using PHP to interact with MySQL databases enables developers to create dynamic, data-driven web applications. Ensuring secure, efficient, and error-free database operations is paramount for maintaining the integrity and performance of web applications.

---

### Additional Resources

- [PHP MySQL Documentation](https://www.php.net/manual/en/book.mysqli.php)
- [W3Schools PHP MySQL Tutorial](https://www.w3schools.com/php/php_mysql_intro.asp)
