import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Link, useLocation } from 'react-router-dom';

export const PresiSectionByCategoryScreen = () => {
  const location = useLocation();
  const catId = location.pathname.split('/')[2];
  console.log(catId);
  //Declaration de notre variable qui contient les presi(articles)
  const [presi, setPresi] = useState([]);

  //Fonction useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1000/api/presiSections/ByCategory/' + catId
          // `http://localhost:1000/api/presi/list`
        );
        setPresi(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    // Affiche tous les presi concernant les sections en fonction des catégories(abidjan, bouake...)
    <div>
      <Container className="presi">
        <Row>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Tous les presi</Card.Title>
                {presi.map((president) => (
                  <Link className="link" to={`/ByCategory/${president._id}`}>
                    <div className="post" key={president.id}>
                      {president?.name}
                      {president?.lastname}
                      <img
                        src={`../upload/${president.img}`}
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
