// banner
const mainBanner = document.querySelector('#main-banner');
const galleryUl = document.querySelector('.fade-gallery ul');
const galleryUlLi = document.querySelectorAll('.fade-gallery ul li');
const controllerUl = document.querySelector('ul.banner-control');
const controllerUlLi = document.querySelectorAll('ul.banner-control li');
const controllerUlLiA = document.querySelectorAll('ul.banner-control li a');
mainBanner.style.height = galleryUlLi[0].offsetHeight+'px';
let currentNum = -1;
function fadeGalleryFn(num){
  for(let i=0; i<galleryUlLi.length; i++){
    galleryUlLi[i].classList.remove('on');
    galleryUlLi[i].inert = true;
  };
  galleryUlLi[num].classList.add('on');
  galleryUlLi[num].inert = false;
}
function fadeGalleryTimer(){
  currentNum++;
  if(currentNum >= galleryUlLi.length) currentNum = 0;
  fadeGalleryFn(currentNum);
};
let bannerIn = setInterval(fadeGalleryTimer, 3000);
(()=>{fadeGalleryTimer()})();
let controllerTrigger = true;
function galleryControllerFn(e){
  controllerUlLi.forEach((el, idx)=>{
    if(e.target == el || e.target == el.firstChild){
      if(controllerTrigger){
        if(e.type == 'mouseover'){
          clearInterval(bannerIn);
        }else if(e.type == 'mouseout'){
          bannerIn = setInterval(fadeGalleryTimer, 3000);
        }
      }else{
        return false;
      }
    }
  });
};
const preBtn = document.querySelector('li.pre');
const nextBtn = document.querySelector('li.next');
const pauseBtn = document.querySelector('li.pause');
const playBtn = document.querySelector('li.play');
pauseBtn.addEventListener('click', function(e){
  e.preventDefault();
  this.classList.add('hide');
  playBtn.classList.remove('hide');
  controllerTrigger = false;
  clearInterval(bannerIn);
});
pauseBtn.addEventListener('mouseover', galleryControllerFn);
pauseBtn.addEventListener('mouseout', galleryControllerFn);
playBtn.addEventListener('click', function(e){
  e.preventDefault();
  this.classList.add('hide');
  pauseBtn.classList.remove('hide');
  controllerTrigger = true;
});
playBtn.addEventListener('mouseover', galleryControllerFn);
playBtn.addEventListener('mouseout', galleryControllerFn);
preBtn.addEventListener('click', function(e){
  e.preventDefault();
  currentNum--;
  if(currentNum<0) currentNum = galleryUlLi.length - 1;
  fadeGalleryFn(currentNum);
});
preBtn.addEventListener('mouseover', galleryControllerFn);
preBtn.addEventListener('mouseout', galleryControllerFn);
nextBtn.addEventListener('click', function(e){
  e.preventDefault();
  currentNum++;
  if(currentNum >= galleryUlLi.length) currentNum = 0;
  fadeGalleryFn(currentNum);
});
nextBtn.addEventListener('mouseover', galleryControllerFn);
nextBtn.addEventListener('mouseout', galleryControllerFn);
//game section slider
const gameCarouselWidth = document.querySelector('.game-sec .carousel').offsetWidth;
const gameCarouselUl = document.querySelector('.carousel-inner ul');
const gameCarouselArrowRight = document.querySelector('.carousel button.right-arrow');
const gameCarouselArrowLeft = document.querySelector('.carousel button.left-arrow');
const gameSchedule = [
  {round: '1 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.10.20(월) 19:00', place: '수원체육관', homeScore: '0', away: '우리카드', awayEmblem: 'wc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '1 ROUND', homeEmblem: 'ka', home: '대한항공', time: '2025.10.23(목) 19:00', place: '인천계양체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayEmblem: 'kc', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '1 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.10.29(수) 19:00', place: '수원체육관', homeScore: '1', away: '현대케피탈', awayEmblem: 'hd', awayEmblem: 'hd', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '1 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.11.01(토) 14:00', place: '수원체육관', homeScore: '3', away: '삼성화재', awayEmblem: 'ss', awayEmblem: 'ss', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '1 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.11.06(목) 19:00', place: '수원체육관', homeScore: '3', away: 'OK저축은행', awayEmblem: 'ok', awayEmblem: 'ok', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '1 ROUND', homeEmblem: 'kb', home: 'KB손해보험', time: '2025.11.11(화) 19:00', place: '경민대학교 기념관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'wc', home: '우리카드', time: '2025.11.14(금) 19:00', place: '서울 장충체육관', homeScore: '0', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'hd', home: '현대케피탈', time: '2025.11.20(목) 19:00', place: '천안 유관순체육관', homeScore: '0', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'ss', home: '삼성화재', time: '2025.11.23(일) 14:00', place: '대전 충무체육관', homeScore: '1', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.11.28(금) 19:00', place: '수원체육관', homeScore: '0', away: '대한항공', awayEmblem: 'ka', awayEmblem: 'ka', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'kb', home: 'KB손해보험', time: '2025.12.02(화) 19:00', place: '경민대학교 기념관', homeScore: '0', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '2 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.12.05(금) 19:00', place: '수원체육관', homeScore: '3', away: 'OK저축은행', awayEmblem: 'ok', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.12.10(수) 19:00', place: '수원체육관', homeScore: '1', away: '우리카드', awayEmblem: 'wc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.12.13(토) 14:00', place: '수원체육관', homeScore: '3', away: 'KB손해보험', awayEmblem: 'kb', awayEmblem: 'kb', awayScore: '0', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'ka', home: '대한항공', time: '2025.12.19(금) 19:00', place: '인천 계양체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '0', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.12.23(화) 19:00', place: '수원체육관', homeScore: '3', away: '삼성화재', awayEmblem: 'ss', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2025.12.27(토) 14:00', place: '수원체육관', homeScore: '3', away: '현대케피탈', awayEmblem: 'hd', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '3 ROUND', homeEmblem: 'ok', home: 'OK저축은행', time: '2025.12.30(화) 19:00', place: '부산 강서체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'kb', home: 'KB손해보험', time: '2026.01.03(토) 14:00', place: '경민대학교 기념관', homeScore: '1', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.01.06(화) 19:00', place: '수원체육관', homeScore: '3', away: 'OK저축은행', awayEmblem: 'ok', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'ss', home: '삼성화재', time: '2026.01.10(토) 14:00', place: '대전 충무체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.01.15(목) 19:00', place: '수원체육관', homeScore: '2', away: '우리카드', awayEmblem: 'wc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.01.20(화) 19:00', place: '인천 계양체육관', homeScore: '3', away: '대한항공', awayEmblem: 'ka', awayScore: '0', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '4 ROUND', homeEmblem: 'hd', home: '현대케피탈', time: '2026.01.23(금) 19:00', place: '천안 유관순체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '0', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.01.29(목) 19:00', place: '수원체육관', homeScore: '3', away: '현대케피탈', awayEmblem: 'hd', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'wc', home: '우리카드', time: '2026.02.02(월) 19:00', place: '서울 장충체육관', homeScore: '1', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'wc', home: '우리카드', time: '2026.02.07(토) 14:00', place: '인천 계양체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'ok', home: 'OK저축은행', time: '2026.02.11(수) 19:00', place: '부산 강서체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '1', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.02.16(월) 19:00', place: '경민대학교 기념관', homeScore: '1', away: 'KB손해보험', awayEmblem: 'kb', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '5 ROUND', homeEmblem: 'ss', home: '삼성화재', time: '2026.02.20(금) 19:00', place: '대전 충무체육관', homeScore: '1', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'hd', home: '현대케피탈', time: '2026.02.26(목) 19:00', place: '천안 유관순체육관', homeScore: '1', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.03.02(월) 14:00', place: '인천 계양체육관', homeScore: '1', away: '대한항공', awayEmblem: 'ka', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.03.07(토) 14:00', place: '수원체육관', homeScore: '3', away: '삼성화재', awayEmblem: 'ss', awayScore: '0', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'ok', home: 'OK저축은행', time: '2026.03.11(수) 19:00', place: '부산 강서체육관', homeScore: '0', away: '한국전력', awayEmblem: 'kc', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'wc', home: '우리카드', time: '2026.03.14(토) 14:00', place: '서울 장충체육관', homeScore: '3', away: '한국전력', awayEmblem: 'kc', awayScore: '2', leftBtn: '경기 영상', rightBtn: '경기 기록'},
  {round: '6 ROUND', homeEmblem: 'kc', home: '한국전력', time: '2026.03.18(수) 19:00', place: '수원체육관', homeScore: '0', away: 'KB손해보험', awayEmblem: 'kb', awayScore: '3', leftBtn: '경기 영상', rightBtn: '경기 기록'}
];
gameCarouselUl.style.width = (gameSchedule.length*290+40*(gameSchedule-1)) + 'px';
let carouselLiArray = '';
let yesterday =new Date();
let today =  new Date();
let yesterdayIndex ='';
for(let i=0;i<gameSchedule.length-1;i++){
  yesterday.setFullYear(Number(gameSchedule[i].time.substring(0,4)), Number(gameSchedule[i].time.substring(5,7))-1, Number(gameSchedule[i].time.substring(8,10)))
  if(yesterday<today) yesterdayIndex = i;
};
const carouselGap = gameCarouselWidth + 40;
let gameCurrentNum = Math.floor(yesterdayIndex/4);
function setGameDayFn(){
  gameCarouselUl.style.left = -gameCurrentNum*carouselGap+ 'px';
};
setGameDayFn();
for(let i = 0; i<gameSchedule.length;i++){
  carouselLiArray+=
    `<li>
        <span class="round">${gameSchedule[i].round}</span>
        <span class="time">${gameSchedule[i].time}</span>
        <span class="place">${gameSchedule[i].place}</span>
        <div class="team">
          <div class="home">
            <span class="emblem ${gameSchedule[i].homeEmblem}"></span>
            <span class="name">${gameSchedule[i].home}</span>
            <span class="score">${gameSchedule[i].homeScore}</span>
          </div>
          <span class="vs">vs</span>
          <div class="away">
            <span class="emblem ${gameSchedule[i].awayEmblem}"></span>
            <span class="name">${gameSchedule[i].away}</span>
            <span class="score">${gameSchedule[i].awayScore}</span>
          </div>
        </div>
        <div class="btn">
          <a href="#" class="left-btn">${gameSchedule[i].leftBtn}</a>
          <span class="bar"></span>
          <a href="#" class="right-btn">${gameSchedule[i].rightBtn}</a>
        </div>
      </li>`;
  gameCarouselUl.innerHTML = carouselLiArray;
}
function btnInertFn(num){
  const gameLeftBtn = document.querySelectorAll('.game-sec a.left-btn');
  const gameRightBtn = document.querySelectorAll('.game-sec a.right-btn');
  for(let i = 0; i<gameSchedule.length; i++){
    if(i<num*4 || i>num*4+3){
      gameLeftBtn[i].setAttribute('tabindex', "-1");
      gameRightBtn[i].setAttribute('tabindex', "-1");
    }else{
      gameLeftBtn[i].setAttribute('tabindex', '0');
      gameRightBtn[i].setAttribute('tabindex', '0');
    }
  }
}
btnInertFn(gameCurrentNum);
gameCarouselArrowLeft.addEventListener('click', function(){
  if(gameCurrentNum>=gameSchedule.length/4-1) gameCurrentNum = -1;
  gameCurrentNum++;
  gameCarouselUl.style.left = -gameCurrentNum*carouselGap+ 'px';
  btnInertFn(gameCurrentNum);
}); 
gameCarouselArrowRight.addEventListener('click', function(){
  if(gameCurrentNum<=0) gameCurrentNum = gameSchedule.length/4;
  gameCurrentNum--;
  gameCarouselUl.style.left = -gameCurrentNum*carouselGap+ 'px';
  btnInertFn(gameCurrentNum);
});
//photo gallery
const photoSec = document.querySelector('section.gallery-sec');
const photoSecUl = document.querySelector('section.gallery-sec .inner ul');
window.addEventListener('scroll', function(){
  if(this.window.scrollY>=600){
    photoSec.style.transform = 'translateY(0)';
    photoSecUl.style.opacity = '1';
  }else{
    photoSec.style.transform = 'translateY(300px)';
    photoSecUl.style.opacity = '0';
  }
});
const photoSecUlLiA = document.querySelectorAll('section.gallery-sec .inner ul li a');
photoSecUlLiA.forEach((el, idx)=>{
  el.style.background = `url('img/gallery-sec/gallery${idx}.jpeg') no-repeat center / cover`;
});
//player section
const playerSliderUl = document.querySelector('section.player-sec .slider-inner ul');
const playerSliderUlLi = document.querySelectorAll('section.player-sec .slider-inner ul li');
const leftArrow = document.querySelector('section.player-sec button.left-arrow');
const rightArrow = document.querySelector('section.player-sec button.right-arrow');
playerSliderUl.style.width = playerSliderUlLi[0].offsetWidth*playerSliderUlLi.length + 'px';
const playerSliderGap = playerSliderUlLi[0].offsetWidth;
let playerSliderNum = 0;
leftArrow.addEventListener('click', function(e){
  rightArrow.style.opacity = '1';
  if(playerSliderNum>=playerSliderUlLi.length-1){
    e.target.style.opacity ='0.4';
    return false;
  }else{
    e.target.style.opacity ='1';
    playerSliderNum++;
    playerSliderUl.style.left = -playerSliderGap*playerSliderNum+'px';
  }
});
rightArrow.addEventListener('click', function(e){
  leftArrow.style.opacity = '1';
  if(playerSliderNum<=0){
    e.target.style.opacity ='0.4';
    return false;
  }else{
    e.target.style.opacity ='1';
    playerSliderNum--;
    playerSliderUl.style.left = -playerSliderGap*playerSliderNum+'px';
  }
});
//sns section
const snsSllider = document.querySelector('.sns-slider');
const snsSlliderUl = document.querySelector('.sns-slider ul');
const snsSlliderUlLi = document.querySelectorAll('.sns-slider ul li');
const snsSlliderUlLiA = document.querySelectorAll('.sns-slider ul li a');
const snsRightArrow = document.querySelector('.sns-slider button.right-arrow');
const snsLeftArrow = document.querySelector('.sns-slider button.left-arrow');
snsSlliderUl.style.widht = snsSlliderUlLi[1].offsetWidth * snsSlliderUlLi.length + 'px';
const snsSliderGap = snsSlliderUlLi[1].offsetLeft - snsSlliderUlLi[0].offsetLeft;
let snsCurrentNum = -1;

function snsItemInertFn(){
  for(let i = 0; i < snsSlliderUlLi.length; i++){
    if(i<snsCurrentNum || i>snsCurrentNum+2){
      snsSlliderUlLiA[i].setAttribute('tabindex', '-1');
    }else{
      snsSlliderUlLiA[i].setAttribute('tabindex', '0');
    }
  }
};
snsItemInertFn();
function snsSliderTimer(){
  if(snsCurrentNum>=snsSlliderUlLi.length-3) snsCurrentNum=-1;
  snsCurrentNum++;
  snsSlliderUl.style.left = -snsCurrentNum*snsSliderGap + 'px';
  snsLeftArrow.style.opacity='1';
  snsRightArrow.style.opacity='1';
  snsItemInertFn();
};
let sliderInt = setInterval(snsSliderTimer, 3000);
(()=>{snsSliderTimer()})();
function snsBtnFn(e){
  if(e.type == 'mouseover'){
    clearInterval(sliderInt)
  }else if(e.type == 'mouseout'){
    sliderInt = setInterval(snsSliderTimer, 3000);
  }
};
snsRightArrow.addEventListener('mouseover', snsBtnFn);
snsRightArrow.addEventListener('mouseout', snsBtnFn);
snsRightArrow.addEventListener('click', function(e){
  snsCurrentNum--;
  if(snsCurrentNum<0){
    snsCurrentNum=0;
    e.target.style.opacity='0.4';
  }else{
    e.target.style.opacity='1';
    snsLeftArrow.style.opacity='1';
  }
  snsSlliderUl.style.left = -snsCurrentNum*snsSliderGap + 'px';
  snsItemInertFn();
});
snsLeftArrow.addEventListener('mouseover', snsBtnFn);
snsLeftArrow.addEventListener('mouseout', snsBtnFn);
snsLeftArrow.addEventListener('click', function(e){
  snsCurrentNum++;
  if(snsCurrentNum>=snsSlliderUlLi.length-2){
    snsCurrentNum=snsSlliderUlLi.length-3;
    e.target.style.opacity='0.4';
  }else{
    e.target.style.opacity='1';
    snsRightArrow.style.opacity='1';
  }
  snsSlliderUl.style.left = -snsCurrentNum*snsSliderGap + 'px';
  snsItemInertFn();
});