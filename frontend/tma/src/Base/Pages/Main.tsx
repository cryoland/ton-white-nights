import { FC } from "react";
import { Link } from "react-router-dom";
import { Score } from "../components/Score";
import { ProgressBar } from 'primereact/progressbar';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Chip } from 'primereact/chip';
import { useTonConnect } from "../../../hooks/useTonConnect";

export const Main: FC = () => {
  const score = 0;
  const currentRouteId = 1;
  const currentRouteName = "Отсюда и до фонтана";
  const checkPoints = [
    { 
        name: "Памятник",
        description: "Описание памятника",
        passed: true,
    },
    { 
        name: "Парк",
        description: "Описание парка",
        passed: false,
    },
    { 
        name: "Площадь",
        description: "Описание площади",
        passed: false,
    },
    { 
        name: "Фонтан",
        description: "Описание фонтана",
        passed: false,
    },
  ];
  const { connected } = useTonConnect();
  const routeProgress = (1 + checkPoints.filter(x => x.passed).length) / (1 + checkPoints.length) * 100;
  const nextCheckPointIndex = checkPoints.map(x => x.passed).indexOf(false);
  return (
    <>    
      {connected && <div className="block border-round-sm px-4 py-2 mb-3" style={{ background: 'var(--blue-400)'}}>
        <Score value={score} />
      </div>}

      {(!connected || !!currentRouteId) && <div className="block border-round-sm px-4 py-3 mb-3 text-left" style={{ background: 'var(--gray-700)'}}>
        <Link to="/routes">
            <div className="text-base text-white">Список доступных маршрутов</div>
        </Link>
      </div>}

      {!connected && <div className="block border-round-sm px-4 py-2 text-left" style={{ background: 'var(--primary-700)'}}>
        <p className="text-base text-white">Подключите кошелек для выбора маршрута</p>
      </div>}

      {!currentRouteId && connected && <div className="block border-round-sm px-4 py-3 mb-3 text-left" style={{ background: 'var(--indigo-600)'}}>
        <Link to="/routes">
            <div className="text-base text-white">На данный момент нет активных маршрутов, нажмите, чтобы выбрать</div>
        </Link> 
      </div>}

      {!!currentRouteId && connected && <div className="block border-round-smtext-left py-2 mb-3" style={{ background: 'var(--gray-400)'}}>        
        <div className="flex justify-content-end mr-2">
            <Link to={'/routes/'+currentRouteId}><Chip label="Подробнее" icon="pi pi-chevron-circle-right" /></Link>
        </div>
        <div className="px-4">
            <p className="text-base text-white">Текущий маршрут: {currentRouteName}</p>
            <div>Прогресс прохождения: <ProgressBar value={routeProgress}></ProgressBar></div>
        </div>
      </div>}

      {!!currentRouteId && connected && <div className="block border-round-sm px-4 py-4 text-left" style={{ background: 'var(--primary-700)'}}>
        <div>Следующая цель: {checkPoints[nextCheckPointIndex].name}</div>
        <Stepper orientation="vertical" activeStep={nextCheckPointIndex}>
            {checkPoints.map((x, index) => (
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
    </>
  );
};
