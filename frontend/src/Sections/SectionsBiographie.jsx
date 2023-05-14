import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';

import { Helmet } from 'react-helmet-async';

export const SectionsBiographie = () => {
  //Declaration de notre variable qui contient les postSection(articles)
  const [postSection, setPostSection] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/postSections/list'
          // `http://localhost:1000/api/postSection/list`
        );
        setPostSection(res.data);
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
      <Container className="postSection">
        <Helmet>
          <title> Liste des Sections à Biographie</title>
        </Helmet>
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Liste des Sections à Biographie</Card.Title>
                {postSection.map((postsect) => (
                  <div className="post" key={postsect.id}>
                    <Link className="link" to={`/postSections/${postsect._id}`}>
                      {/* <img
                        src={`../upload/${postsect.img}`}
                        alt=""
                        className="img-large"
                      /> */}
                      <Button variant="warning">
                        Titre du poste: {postsect?.title}
                      </Button>{' '}
                      <Button variant="success">
                        Section: {postsect?.cat?.title}
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
