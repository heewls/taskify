import GuestHeader from '@/components/layout/Header/GuestHeader';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['700'] });

const POINTS_LIST = [
  {
    id: 1,
    title: '일의 우선순위를',
    subtitle: '관리하세요',
    image: '/icons/point1.svg',
    className: 'h-62 w-74 sm:h-[435px] sm:w-130 lg:w-[594px] lg:h-[487px]',
    reverse: false,
    justifyClass: 'justify-end',
  },
  {
    id: 2,
    title: '해야 할 일을',
    subtitle: '등록하세요',
    image: '/icons/point2.svg',
    className: 'h-[250px] w-[217px] sm:w-90 sm:h-[415px] lg:w-109 lg:h-[502px]',
    reverse: true,
    justifyClass: 'justify-center',
  },
];

const SETTING_BOARD = [
  {
    id: 'dashboard',
    image: '/icons/newDashboard.svg',
    title: '대시보드 설정',
    description: '대시보드 사진과 이름을 변경할 수 있어요.',
    className: 'w-65 h-27',
  },
  {
    id: 'invite',
    image: '/icons/invite.svg',
    title: '초대',
    description: '새로운 팀원을 초대할 수 있어요',
    className: 'w-65 h-50',
  },
  {
    id: 'members',
    image: '/icons/members.svg',
    title: '구성원',
    description: '구성원을 초대하고 내보낼 수 있어요.',
    className: 'w-65 h-[170px]',
  },
];

export default function Home() {
  return (
    <div>
      <GuestHeader />
      <div className="flex h-full w-full items-center justify-center bg-black px-4">
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="relative mt-20 h-42 w-[287px] sm:h-[315px] sm:w-[538px] lg:h-[422px] lg:w-[722px]">
              <Image src="/icons/landingPage.svg" fill alt="landing-image" />
            </div>
            <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-6">
              <h1 className="text-bold40 text-white">새로운 일정 관리</h1>
              <h2 className={`${montserrat.className} text-violet text-[42px] font-bold`}>
                Taskify
              </h2>
            </div>
          </div>
          <Link
            href="/login"
            className="text-medium14 sm:text-medium18 bg-violet my-10 flex h-[46px] w-[235px] items-center justify-center rounded-md text-white sm:h-[54px] sm:w-70"
          >
            로그인하기
          </Link>
          {POINTS_LIST.map(({ id, title, subtitle, image, className, reverse, justifyClass }) => (
            <div
              key={id}
              className={`bg-black300 flex w-full max-w-300 flex-col items-center justify-center rounded-lg sm:items-start sm:pl-20 lg:h-150 lg:gap-20 lg:pl-0 ${
                reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              <div className="flex flex-col items-center gap-20 sm:items-start">
                <span className="text-medium18 text-gray400 my-20 sm:my-0 sm:mt-20 sm:text-[22px]">
                  point{id}
                </span>
                <h3 className="flex flex-col items-center justify-center text-4xl leading-[50px] font-bold text-white sm:items-start sm:text-5xl sm:leading-16">
                  {title}
                  <span>{subtitle}</span>
                </h3>
              </div>
              <div
                className={`mt-40 flex w-full ${justifyClass} lg:mt-0 lg:h-full lg:w-auto lg:items-end`}
              >
                <div className={`relative ${className}`}>
                  <Image src={image} fill alt={`point${id}`} />
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center justify-center gap-10 lg:items-start">
            <h3 className="text-bold24 mt-10 text-[22px] text-white md:text-[28px]">
              생산성을 높이는 다양한 설정⚡️
            </h3>
            <div className="mb-10 flex flex-col gap-10 lg:flex-row">
              {SETTING_BOARD.map((setting) => (
                <div key={setting.id} className="w-full sm:w-[378px]">
                  <div className="bg-black100 flex h-59 items-center justify-center rounded-t-lg">
                    <div className={`${setting.className} relative`}>
                      <Image fill src={setting.image} alt="setting" />
                    </div>
                  </div>
                  <div className="bg-black300 flex h-28 items-center justify-start rounded-b-lg">
                    <div className="ml-10 flex flex-col gap-[18px]">
                      <h4 className="text-bold18 text-white">{setting.title}</h4>
                      <p className="text-medium16 text-white">{setting.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
