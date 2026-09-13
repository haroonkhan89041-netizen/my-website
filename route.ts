import{NextResponse}from'next/server';export async function GET(){return NextResponse.json({ok:true,service:'hunar-web',timestamp:new Date().toISOString()})}
