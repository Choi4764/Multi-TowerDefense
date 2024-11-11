// generatePath(22, 0, 250, 1370, 80)
const generatePath = (pathCounts, startX, startY, endX, maxOffsetY) => {
  const path = [];
  // 균일한 간격으로 배치하기 위한 x 증가치
  // (최종 위치 - 시작 위치) / (패스 갯수 - 1)
  const xIncrement = (endX - startX) / (pathCounts - 1);
  // 엔진에서 찍어보니 이걸 넘어가면 짤림
  const MIN_Y = 200;
  const MAX_Y = 375;

  let x = startX;
  let y = startY;

  for (let i = 0; i < pathCounts; i++) {
    // 현재 좌표를 추가
    path.push({ x: Math.round(x), y: Math.round(y) });

    // x 좌표 증가
    x += xIncrement;

    // y를 랜덤하게
    const rand = Math.random();
    const yIncrement = Math.floor(Math.random() * maxOffsetY);
    if (rand < 0.3) {
      // 30% 확률로 직선 유지
      y = startY;
    } else if (rand < 0.65) {
      // 35% 확률로 위로 이동
      y = startY - yIncrement;
    } else {
      // 35% 확률로 아래로 이동
      y = startY + yIncrement;
    }

    if (y < MIN_Y) {
      // 최소치보다 작으면 이동한만큼 위로 이동
      y = MIN_Y + (MIN_Y - y);
    } else if (y > MAX_Y) {
      // 최대치보다 크면 이동한만큼 아래로 이동
      y = MAX_Y - (y - MAX_Y);
    }
  }

  return path;
};

export default generatePath;
