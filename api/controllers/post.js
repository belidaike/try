import { db } from "../db.js"


export const getPosts = (req, res) => {
    const q = req.query.category
        ? "SELECT * FROM posts WHERE category=?"
        : "SELECT * FROM posts";

    db.query(q, [req.query.category], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
};

export const getPost = (req, res) => {
    const q = "SELECT p.id,`username`,`title`,`description`, p.img, u.img AS userImg,`category`,`date` FROM users u JOIN posts p on u.id = p.uid WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}


export const addPost = (req, res) => {
    const { title, description, img, category, date, uid } = req.body;

    const q = "INSERT INTO posts(`title`,`description`,`img`,`category`,`date`,`uid`) VALUES(?, ?, ?, ?, ?, ?)";
    const values = [title, description, img, category, date, uid];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error inserting post:", err);
            return res.status(500).json(err);
        }
        return res.json("Post has been added.");
    });
};


export const deletePost = (req, res) => {
    const q = "DELETE FROM posts WHERE id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(404).json("Not found")
        return res.json(data)
    })
}
export const updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, description, category } = req.body;

    const q = "UPDATE posts SET `title`=?, `description`=?, `category`=?, `img`='https://www.highreshdwallpapers.com/wp-content/uploads/2015/01/Awesome.jpg' WHERE `id` = ?";

    const values = [title, description, category, postId];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
    });
}


