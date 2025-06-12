

// import AppRoutes from './routes/AppRoutes'

// const App = () => {
//   return (
//     <div>
//       <AppRoutes />
//     </div>
//     <div>
//       <AppRoutes />
//     </div>
//   )
// }

// export default App

import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Header, Sidebar etc. here if needed */}
      <AppRoutes />
    </div>
  );
};

export default App;
