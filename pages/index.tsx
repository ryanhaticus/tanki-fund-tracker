import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useStasContext } from '../providers/StatsProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Index = () => {
  const { tankoins, participants } = useStasContext();

  const getTimezone = () => {
    const date = new Date();
    return date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
  };

  return (
    <div className='px-8 py-4'>
      <h1 className='text-2xl'>Tanki Fund Tracker</h1>
      <span>by Turpz (Haticus)</span>
      <div className='flex gap-x-4 flex-col items-center gap-y-4 lg:flex-row'>
        <div className='flex-grow w-full lg:w-1/2'>
          <Line
            options={{
              scales: {
                x: {
                  display: false,
                },
              },
            }}
            data={{
              labels: tankoins.map((t) => {
                const date = new Date(t.date);
                return `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()} ${getTimezone()}`;
              }),

              datasets: [
                {
                  label: 'Participants',
                  data: participants.map((t) => t.value),
                  backgroundColor: '#ff0051',
                  borderColor: '#ff0051',
                },
              ],
            }}
          />
        </div>
        <div className='flex-grow w-full lg:w-1/2'>
          <Line
            options={{
              scales: {
                x: {
                  display: false,
                },
              },
            }}
            data={{
              labels: tankoins.map((t) => {
                const date = new Date(t.date);
                return `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()} ${getTimezone()}`;
              }),

              datasets: [
                {
                  label: 'Tankoins',
                  data: tankoins.map((t) => t.value),
                  borderColor: '#FFCC00',
                  backgroundColor: '#FFCC00',
                },
              ],
            }}
          />
        </div>
      </div>
      <div className='mt-4'>
        <span>
          If you're inclined,{' '}
          <a
            href='https://github.com/ryanhaticus/tanki-fund-tracker'
            target='_blank'
            className='underline'
          >
            contribute on GitHub
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default Index;
