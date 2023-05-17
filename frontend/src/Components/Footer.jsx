import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

export default function Footer() {
  return (
    <footer>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Contacts</Card.Title>
            <h4>
              © Mai 2023 - AJEET, Amicale des Jeunes, Elèves et Etudiants de
              Toumoukoro Contacts: 07 49 12 20 22
            </h4>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Contacts</Card.Title>
            <h4>
              © Mai 2023 - AJEET, Amicale des Jeunes, Elèves et Etudiants de
              Toumoukoro Contacts: 07 49 12 20 22
            </h4>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Contacts</Card.Title>
            <h4>
              © Mai 2023 - AJEET, Amicale des Jeunes, Elèves et Etudiants de
              Toumoukoro Contacts: 07 49 12 20 22
            </h4>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </footer>
  );
}
