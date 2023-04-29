import React, { useState } from 'react';
import { FlexColumn, FlexRow } from '@components/Atoms/Flex';
import { Rating } from './Rating';
import { PostStar } from '@components/Atoms/PostStar';
import { PostStarChecked } from '@components/Atoms/PostStarChecked';
export const ReviewForm = ({ post, handleRatingChange, handleStarClick }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const starStyle = { cursor: 'pointer', transition: 'color 0.3s easeInOut' };
  return (
    <FlexColumn>
      <div>
        <span>가게 평점:</span>
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => setHoveredStar(starValue)}
            onMouseLeave={() => setHoveredStar(0)}
          >
            {starValue <= (hoveredStar || post.postStarAvg) ? (
              <PostStarChecked
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s easeInOut',
                }}
              />
            ) : (
              <PostStar
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s easeInOut',
                }}
              />
            )}
          </span>
        ))}
      </div>
      <FlexRow>
        <FlexColumn>
          맛
          <Rating
            name="taste"
            value={post.taste}
            onChange={(value) => handleRatingChange('taste', value)}
          />
        </FlexColumn>
        <FlexColumn>
          서비스
          <Rating
            name="service"
            value={post.service}
            onChange={(value) => handleRatingChange('service', value)}
          />
        </FlexColumn>
        <FlexColumn>
          분위기
          <Rating
            name="atmosphere"
            value={post.atmosphere}
            onChange={(value) => handleRatingChange('atmosphere', value)}
          />
        </FlexColumn>
        <FlexColumn>
          만족도
          <Rating
            name="satisfaction"
            value={post.satisfaction}
            onChange={(value) => handleRatingChange('satisfaction', value)}
          />
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
};
//   const handleRatingChange = (name, newValue) => {
//     if (name === 'taste') {
//       setTaste(newValue);
//     } else if (name === 'service') {
//       setService(newValue);
//     } else if (name === 'atmosphere') {
//       setAtmosphere(newValue);
//     } else if (name === 'satisfaction') {
//       setSatisfaction(newValue);
//     }

//     if (onChange) {
//       onChange((pre) => ({ ...pre, [name]: newValue }));
//     }
//   };

//   return (
//     <>
//       <FlexRow style={{ gap: '10px', marginBottom: '20px' }}>
//         <div>맛</div>
//         {[5, 4, 3, 2, 1].map((value) => (
//           <button
//             key={value}
//             style={{ backgroundColor: taste >= value ? '#ffa500' : '#ddd' }}
//             onClick={() => handleRatingChange('taste', value)}
//           >
//             {value}
//           </button>
//         ))}
//       </FlexRow>
//       <FlexRow style={{ gap: '10px', marginBottom: '20px' }}>
//         <div>서비스</div>
//         {[5, 4, 3, 2, 1].map((value) => (
//           <button
//             key={value}
//             style={{ backgroundColor: service >= value ? '#ffa500' : '#ddd' }}
//             onClick={() => handleRatingChange('service', value)}
//           >
//             {value}
//           </button>
//         ))}
//       </FlexRow>
//       <FlexRow style={{ gap: '10px', marginBottom: '20px' }}>
//         <div>분위기</div>
//         {[5, 4, 3, 2, 1].map((value) => (
//           <button
//             key={value}
//             style={{
//               backgroundColor: atmosphere >= value ? '#ffa500' : '#ddd',
//             }}
//             onClick={() => handleRatingChange('atmosphere', value)}
//           >
//             {value}
//           </button>
//         ))}
//       </FlexRow>
//       <FlexRow style={{ gap: '10px', marginBottom: '20px' }}>
//         <div>만족도</div>
//         {[5, 4, 3, 2, 1].map((value) => (
//           <button
//             key={value}
//             style={{
//               backgroundColor: satisfaction >= value ? '#ffa500' : '#ddd',
//             }}
//             onClick={() => handleRatingChange('satisfaction', value)}
//           >
//             {value}
//           </button>
//         ))}
//       </FlexRow>
//     </>
//   );
// };

// import { useState } from 'react';
// import { Rating } from './Rating';
// const ratings = [
//   { value: 5, label: '아주 좋아요' },
//   { value: 4, label: '조금 좋아요' },
//   { value: 3, label: '보통이에요' },
//   { value: 2, label: '별로에요' },
//   { value: 1, label: '싫어요' },
// ];
// function ReviewForm({ post, value }) {
//   const [currentPost, setCurrentPost] = useState(post);

//   const handleRatingChange = (name, value) => {
//     setCurrentPost({ ...currentPost, [name]: value });
//   };
//   console.log('handleRatingChange리뷰폼', handleRatingChange);
//   return (
//     <>
//       <Rating
//         name="taste"
//         value={currentPost.taste}
//         onChange={(value) => handleRatingChange('taste', value)}
//       />
//       <Rating
//         name="service"
//         value={currentPost.service}
//         onChange={(value) => handleRatingChange('service', value)}
//       />
//       <Rating
//         name="atmosphere"
//         value={currentPost.atmosphere}
//         onChange={(value) => handleRatingChange('atmosphere', value)}
//       />
//       <Rating
//         name="satisfaction"
//         value={currentPost.satisfaction}
//         onChange={(value) => handleRatingChange('satisfaction', value)}
//       />
//     </>
//   );
// }

// export default ReviewForm;
