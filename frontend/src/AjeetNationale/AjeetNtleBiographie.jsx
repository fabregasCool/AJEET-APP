import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';

import { Helmet } from 'react-helmet-async';

export const AjeetNtleBiographie = () => {
  //Declaration de notre variable qui contient les postAjeetNtle(articles)
  const [postAjeetNtle, setPostAjeetNtle] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/postAjeetNtles/list'
          // `http://localhost:1000/api/postAjeetNtle/list`
        );
        setPostAjeetNtle(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  //Afin d'éviter que la balise "p" ne s'affiche
  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent;
  // };
  return (
    <div>
      <Container className="postAjeetNtle">
        <Helmet>
          <title> Liste des Sections à Biographie</title>
        </Helmet>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Liste des Sections à Biographie</Card.Title>
                {postAjeetNtle.map((postajeet) => (
                  <div className="post" key={postajeet.id}>
                    <Link
                      className="link"
                      to={`/postAjeetNtle/${postajeet._id}`}
                    >
                      {/* <img
                        src={`../upload/${postsect.img}`}
                        alt=""
                        className="img-large"
                      /> */}
                      <Button variant="warning">
                        Titre du poste: {postajeet?.title}
                      </Button>{' '}
                      <Button variant="success">
                        Catégorie: {postajeet?.cat?.title}
                      </Button>
                    </Link>
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
