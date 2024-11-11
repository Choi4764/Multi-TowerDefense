import { jwtDecode } from 'jwt-decode';
import { matchNotification } from '../../handler/game/matchNotification.js';

const matchQueue = []; // 매치 대기열을 관리하는 배열
let matchCheckInterval = null; // 매칭 확인을 위한 인터벌 참조
const CHECK_INTERVAL = 1000; // 대기열을 확인하는 간격 (밀리초)

class UserManager {
  // 사용자를 매치 대기열에 추가하는 함수
  addToMatchQueue(user) {
    matchQueue.push(user); // User 객체를 대기열에 추가
    console.log(`매치 대기열에 추가: ${user}`);

    // 대기열에 2명 이상의 사용자가 있으면 인터벌 시작
    if (matchQueue.length >= 1 && !matchCheckInterval) {
      this.startQueueChecker();
    }
  }

  // 대기열 확인 인터벌을 시작하는 함수
  startQueueChecker() {
    matchCheckInterval = setInterval(() => {
      this.tryStartMatch(); // 매칭 시도
    }, CHECK_INTERVAL);

    console.log('매치 대기열 시작!');
  }

  // 대기열 확인 인터벌을 중지하는 함수
  stopQueueChecker() {
    if (matchCheckInterval) {
      clearInterval(matchCheckInterval);
      matchCheckInterval = null;
      console.log('매치 대기열 종료!');
    }
  }

  // 대기열을 확인하여 충분한 사용자가 있으면 게임을 시작하는 함수
  tryStartMatch() {
    console.log(`매치 시작 대기열.... ${Date.now()}`);
    while (matchQueue.length >= 2) {
      // 대기열에 사용자가 2명 이상 있으면
      const [user1, user2] = matchQueue.splice(0, 2); // 첫 두 사용자를 대기열에서 제거
      this.startGame(user1, user2); // 두 사용자를 매칭하여 게임 시작
    }

    // 대기열에 1명 이하의 사용자가 남아 있으면 인터벌 중지
    if (matchQueue.length < 1) {
      this.stopQueueChecker();
    }
  }

  // 매칭된 사용자 간 게임을 시작하는 함수
  startGame(user1, user2) {

    const IDPayload = {
      userIDNotification: { player01Id: jwtDecode(user1.id).userId, player02Id: jwtDecode(user2.id).userId },
    };

    user1.socket.write(createResponse(IDPayload, PACKET_TYPE.USER_ID_NOTIFICATION, user1.getNextSequence()));
    user2.socket.write(createResponse(IDPayload, PACKET_TYPE.USER_ID_NOTIFICATION, user2.getNextSequence()));

    setTimeout(() => {
      matchNotification([user1, user2]);

      // 두 사용자에게 JSON 형식으로 게임 시작 메시지 전송
      console.log(`게임시작! ${user1} 과 ${user2}`);
    }, 1000);
  }

  // 매치 대기열에서 사용자를 제거하는 함수 (연결 종료 시 호출)
  removeFromQueue(userId) {
    const index = matchQueue.findIndex((user) => user.id === userId);
    if (index !== -1) {
      const removedUser = matchQueue.splice(index, 1)[0];
      console.log(`매치 대기열에서 삭제!: ${removedUser}`);

      // 대기열에 1명 이하의 사용자가 남아 있으면 인터벌 중지
      if (matchQueue.length < 1) {
        this.stopQueueChecker();
      }
    }
  }
}

export default new UserManager();
