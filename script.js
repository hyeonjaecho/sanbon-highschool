
class CleaningDutySelector {
  constructor() {
    this.drawButton = document.getElementById('drawButton');
    this.resetButton = document.getElementById('resetButton');
    this.resultContainer = document.getElementById('result');
    this.selectedNumbersContainer = document.getElementById('selectedNumbers');
    
    this.init();
  }
  
  init() {
    this.drawButton.addEventListener('click', () => this.showConfirmDialog());
    this.resetButton.addEventListener('click', () => this.showResetDialog());
  }
  
  // 뽑기 확인 대화상자
  showConfirmDialog() {
    Swal.fire({
      title: '청소당번을 뽑으시겠습니까?',
      text: '1번부터 25번까지 중에서 랜덤으로 5명이 선택됩니다.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-dice"></i> 네, 뽑겠습니다!',
      cancelButtonText: '<i class="fas fa-times"></i> 취소',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.drawNumbers();
      }
    });
  }
  
  // 다시 뽑기 확인 대화상자
  showResetDialog() {
    Swal.fire({
      title: '다시 뽑으시겠습니까?',
      text: '현재 결과가 초기화되고 새로운 청소당번을 뽑게 됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-redo"></i> 네, 다시 뽑겠습니다',
      cancelButtonText: '<i class="fas fa-times"></i> 취소',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-warning me-2',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.reset();
        this.showConfirmDialog();
      }
    });
  }
  
  // 1부터 25까지 중에서 랜덤으로 5개 숫자 선택
  drawNumbers() {
    // 로딩 대화상자 표시
    Swal.fire({
      title: '청소당번을 뽑는 중...',
      html: '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000
    });
    
    setTimeout(() => {
      const numbers = [];
      const totalNumbers = 25;
      const selectCount = 5;
      
      // 1부터 25까지의 숫자 배열 생성
      const availableNumbers = Array.from({length: totalNumbers}, (_, i) => i + 1);
      
      // Fisher-Yates 셔플 알고리즘을 사용해 랜덤하게 5개 선택
      for (let i = 0; i < selectCount; i++) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        numbers.push(availableNumbers.splice(randomIndex, 1)[0]);
      }
      
      // 숫자를 오름차순으로 정렬
      numbers.sort((a, b) => a - b);
      
      Swal.close();
      this.displayResults(numbers);
      this.showResultDialog(numbers);
    }, 2000);
  }
  
  // 결과 알림 대화상자
  showResultDialog(numbers) {
    const numbersHtml = numbers.map(num => 
      `<span class="badge bg-primary fs-5 me-2 p-2">${num}번</span>`
    ).join('');
    
    Swal.fire({
      title: '🎉 청소당번이 선정되었습니다!',
      html: `
        <div class="mt-3">
          <p class="fs-6 text-muted mb-3">이번 주 청소당번은 다음과 같습니다:</p>
          <div class="p-3 bg-light rounded">${numbersHtml}</div>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '<i class="fas fa-check"></i> 확인',
      customClass: {
        confirmButton: 'btn btn-success'
      },
      buttonsStyling: false
    });
  }
  
  displayResults(numbers) {
    // 결과 컨테이너 초기화
    this.selectedNumbersContainer.innerHTML = '';
    
    // 각 숫자에 대해 부트스트랩 카드 생성
    numbers.forEach((number, index) => {
      setTimeout(() => {
        const col = document.createElement('div');
        col.className = 'col-auto';
        
        const numberBadge = document.createElement('div');
        numberBadge.className = 'number-badge mx-auto';
        numberBadge.innerHTML = `<strong>${number}번</strong>`;
        
        col.appendChild(numberBadge);
        this.selectedNumbersContainer.appendChild(col);
      }, index * 300); // 각 카드를 300ms 간격으로 표시
    });
    
    // 결과 컨테이너 표시
    setTimeout(() => {
      this.resultContainer.classList.add('show');
    }, 100);
    
    // 버튼 상태 변경
    this.drawButton.style.display = 'none';
    this.resetButton.classList.remove('d-none');
  }
  
  reset() {
    // 결과 숨기기
    this.resultContainer.classList.remove('show');
    this.selectedNumbersContainer.innerHTML = '';
    
    // 버튼 상태 복원
    this.drawButton.style.display = 'inline-block';
    this.resetButton.classList.add('d-none');
  }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  new CleaningDutySelector();
  
  // 초기 환영 메시지
  setTimeout(() => {
    Swal.fire({
      title: '청소당번 뽑기에 오신 것을 환영합니다! 👋',
      text: '공정하고 투명한 방식으로 청소당번을 선정해드립니다.',
      icon: 'info',
      confirmButtonText: '<i class="fas fa-play"></i> 시작하기',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    });
  }, 500);
});
