import React, { useState, useEffect } from 'react';

const About = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={show ? 'page show' : 'page hide'}>
      <div className='textContainer center'>
        <p>
          atomic synthesis is a system of sound design that uses directed graph connections to define the interactions between the
          instrument's nodes.
        </p>
        <p>
          a node can be thought of as a basic musical unit. atomizer uses the names of elements to define these various nodes, and
          their chemical properties as the basis for the results their interactions will produce.
        </p>
        <p>
          chaining multiple nodes together like atoms, atomizer can build complex musical molecules of varying viscosity,
          temperature, weight, and reactivity.{' '}
        </p>
        <p>
          stoic noble gases, solids that melt and reform, heterogeneous mixtures, foamy liquids - under the right conditions, all
          are possible here.
        </p>
      </div>
    </div>
  );
};

export default About;
