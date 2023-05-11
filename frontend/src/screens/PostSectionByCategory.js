import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';

export const PostSectionByCategory = () => {
  const location = useLocation();
  const catId = location.pathname.split('/')[2];
  console.log(catId);
  //Declaration de notre variable qui contient les posts(articles)
  const [posts, setPosts] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/postSections/ByCategory/' + catId
          // `http://localhost:1000/api/posts/list`
        );
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    // Affiche tous les posts concernant les sections en fonction des catégories(abidjan, bouake...)
    <div>
      <Container className="posts">
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Tous les posts</Card.Title>
                {posts.map((post) => (
                  <Link className="link" to={`/ByCategory/${post._id}`}>
                    <div className="post" key={post.id}>
                      {post?.title}
                      {post?.desc}
                      <img
                        src={`../upload/${post.img}`}
                        alt="pas d'image"
                        className="img-large"
                      />
                    </div>
                  </Link>
                ))}
              </Card.Body>
            </Card>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
