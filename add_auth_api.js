const fs = require('fs');
const path = 'app/api/visitors/route.js';
let content = fs.readFileSync(path, 'utf8');

const authCheckStr = `
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== 'hoing11111@gmail.com') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
`;

// Insert into GET
content = content.replace(
  'export async function GET(request) {\n  try {\n    const supabase = await createClient();',
  'export async function GET(request) {\n  try {\n    const supabase = await createClient();\n' + authCheckStr
);

// Insert into DELETE
content = content.replace(
  'export async function DELETE(request) {\n  try {\n    const supabase = await createClient();',
  'export async function DELETE(request) {\n  try {\n    const supabase = await createClient();\n' + authCheckStr
);

fs.writeFileSync(path, content);
console.log("Secured API routes.");
