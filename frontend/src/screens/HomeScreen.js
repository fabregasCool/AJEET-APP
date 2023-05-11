import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';

export const HomeScreen = () => {
  //Declaration de notre variable qui contient les posts(articles)
  const [posts, setPosts] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/posts/list'
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

  //Afin d'éviter que la balise "p" ne s'affiche
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 Caroussel-img"
            src="https://scontent.fabj1-1.fna.fbcdn.net/v/t1.18169-9/550789_104824839677626_2072465352_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEW0aEGg5lbIYaAKXjM0In__HhXCrf0yK78eFcKt_TIrt_J9QT8XJZYqqHsdmusejWUqvjYmEpPLZkJ0ITGcNhe&_nc_ohc=WXwm2s6YHW4AX_bhnhV&_nc_ht=scontent.fabj1-1.fna&oh=00_AfDplM5xlJ0RplI5jZOlx9M4PSO1aWXXrRaQ_D9pPvSq_A&oe=647B4B30"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 Caroussel-img"
            src="https://scontent.fabj1-1.fna.fbcdn.net/v/t39.30808-6/339258512_1379623369247960_3899959132922827621_n.jpg?stp=dst-jpg_p180x540&_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHFqtSOhfaAXNljTakuOdfjAONttGAMMhoA4220YAwyGirvfk3PI6iqmW-xVwF3HHHzK5xV38fDdco-NNAzDrHd&_nc_ohc=TwFVri5Q0MkAX_Xz55W&_nc_oc=AQkQKzXgcgB_GM5e_42w3cbLQK2Joify6xVqwmOTdf8fEieEuREnLVoBpJTgf1XjdJA&_nc_zt=23&_nc_ht=scontent.fabj1-1.fna&oh=00_AfD1LnDAGfBS1bJHmUCol1N1DC6s982nmUOk327o2mrmhg&oe=6458D467"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 Caroussel-img"
            src="https://scontent.fabj1-1.fna.fbcdn.net/v/t39.30808-6/337502810_751588936472591_9155069827477435660_n.jpg?stp=dst-jpg_p526x296&_nc_cat=103&ccb=1-7&_nc_sid=5cd70e&_nc_eui2=AeFEU1iz-n0anffb2MRvfgRFI95WuqzRDgUj3la6rNEOBY1VxGUyVIRmw4Jt_FpJxBvcTPsgp7KgP7ZEWQyYqTR7&_nc_ohc=xuNgET2-qbEAX80KHPz&_nc_oc=AQlU9ffbBiXwW_7Zp6EDu6jXjW7e-LKMDTvwkSGRBV2slXL8nYOFZW69qhrzif9ZAVA&_nc_zt=23&_nc_ht=scontent.fabj1-1.fna&oh=00_AfCQx0RwOKgFhIKn1UQMKqo0J0DUx9Y2WZnTgHf7IPR2sQ&oe=64584F65"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="posts">
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Tous les posts</Card.Title>
                {posts.map((post) => (
                  <div className="post" key={post.id}>
                    <Link className="link" to={`/post/${post._id}`}>
                      <img
                        src={`../upload/${post.img}`}
                        alt=""
                        className="img-large"
                      />
                      <h1>Titre du poste</h1>
                      <Button variant="warning">{post.title}</Button>
                    </Link>
                  </div>
                ))}
              </Card.Body>
            </Card>{' '}
          </Col>
          {/* Affichage des Titres des posts */}
          <Col md={4}>
            {' '}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Tous les posts</Card.Title>
                {posts.map((post) => (
                  <div className="post" key={post.id}>
                    <div className="content">
                      <Link className="link" to={`/post/${post._id}`}>
                        <h1>{post.title}</h1>
                      </Link>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>{' '}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
