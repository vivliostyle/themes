import React, {useState} from 'react';
import {Renderer} from '@vivliostyle/react';

interface AppProps {
  source: string;
  style: string;
}
const App: React.FC<AppProps> = ({source, style}) => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Renderer source={source} page={page}>
        {({container}) => <>{container}</>}
      </Renderer>
    </div>
  );
};

export default App;
