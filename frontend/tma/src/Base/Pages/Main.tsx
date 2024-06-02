import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Score } from "../components/Score";
import { ProgressBar } from 'primereact/progressbar';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Chip } from 'primereact/chip';
import { useTonConnect } from "../../../hooks/useTonConnect";

const getCurrentUserRoute = async () => {
  try {
    return await fetch(`https://${import.meta.env.VITE_API_DOMAIN}/user/routes/current`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
      }
    });
  } catch (err) {
      console.warn(JSON.stringify(err))
  }
}

const getUserBalance = async () => {
  try {
    return await fetch(`https://${import.meta.env.VITE_API_DOMAIN}/user/balance`, {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Authorization': `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`
      }
    });
  } catch (err) {
      console.warn(JSON.stringify(err))
  }
}

export const Main: FC = () => {
  const [score, setScore] = useState(0);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [nextCheckPointIndex, setNextCheckPointIndex] = useState(1);
  const [routeProgress, setRouteProgress] = useState(1);
  const { connected } = useTonConnect();

  useEffect(() => {
    getCurrentUserRoute()
      .then(res => {
          return (res as Response).json();
      })
      .then((data) => {
        setCurrentRoute(data);
        const progress = (1 + (data.userCheckPoints as any[]).filter(x => x.passed).length) / (1 + (data.userCheckPoints as any[]).length) * 100;
        setRouteProgress(progress)
        const index = (data.userCheckPoints as any[]).map(x => x.passed).indexOf(false);
        setNextCheckPointIndex(index);
      })
      .catch(err => console.warn(err));

      getUserBalance()
        .then(res => {
            return (res as Response).json();
        })
        .then((data) => {
          setScore(data.balance);
        })
      .catch(err => console.warn(err));    
      return () => {};
    }, [score, currentRoute, nextCheckPointIndex]);

  return (
    <>    
      {connected && <div className="block border-round-sm px-4 py-2 mb-3" style={{ background: 'var(--blue-400)'}}>
        <Score value={score} />
      </div>}

      {!!currentRoute && <>
        {(!connected || !!(currentRoute as any).id) && <div className="block border-round-sm px-4 py-3 mb-3 text-left" style={{ background: 'var(--gray-700)'}}>
          <Link to="/routes">
              <div className="text-base text-white">Список доступных маршрутов</div>
          </Link>
        </div>}

        {!connected && <div className="block border-round-sm px-4 py-2 text-left" style={{ background: 'var(--primary-700)'}}>
          <p className="text-base text-white">Подключите кошелек для выбора маршрута</p>
        </div>}

        {!(currentRoute as any).id && connected && <div className="block border-round-sm px-4 py-3 mb-3 text-left" style={{ background: 'var(--indigo-600)'}}>
          <Link to="/routes">
              <div className="text-base text-white">На данный момент нет активных маршрутов, нажмите, чтобы выбрать</div>
          </Link> 
        </div>}

        {!!(currentRoute as any).id && connected && <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
          <div className="flex justify-content-end mr-2">
              <Link to={'/routes/'+(currentRoute as any).id}><Chip label="Подробнее" icon="pi pi-chevron-circle-right" /></Link>
          </div>
          <div className="px-4">
              <p className="text-base text-white">Текущий маршрут: {(currentRoute as any).name}</p>
              <div>Прогресс прохождения: <ProgressBar value={routeProgress}></ProgressBar></div>
          </div>
        </div>}

        {!!(currentRoute as any).id && connected && <div className="block border-round-sm px-4 py-4 text-left" style={{ background: 'var(--primary-700)'}}>
          <div>Следующая цель: {((currentRoute as any).userCheckPoints as any[])[nextCheckPointIndex].name}</div>
          <Stepper orientation="vertical" activeStep={nextCheckPointIndex}>
              {((currentRoute as any).userCheckPoints as any[]).map((x, index) => (
                  <StepperPanel header={x.name} key={'steppanel-'+index} pt={{separator: null,}}>
                      <div className="flex flex-column h-6rem">
                          <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                              {x.description}
                          </div>
                      </div>
                  </StepperPanel>
              ))} 
          </Stepper>
        </div>}
      </>}
    </>
  );
};
