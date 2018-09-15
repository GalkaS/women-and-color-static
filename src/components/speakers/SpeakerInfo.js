import React from 'react';

// App
import css from 'appAssets/css/speakers.module.css';

const SpeakerInfo = ({ speaker }) => {
  const title = `About ${speaker.first_name}`;
  return (
    <div className={css.speakerInfo}>
      <h2 className={css.sectionHeader}>{title}</h2>
      <p className={css.speakerInfoDescription}>{speaker.description}</p>
    </div>
  );
};

export default SpeakerInfo;
