import Ceb from './components/ceb';
import ProtectedRoute from '../components/ProtectedRoute';

export default function CebPage() {
  return (
    <ProtectedRoute>
      <Ceb />
    </ProtectedRoute>
  );
}