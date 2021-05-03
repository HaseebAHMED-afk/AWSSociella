#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SociellaServerStack } from '../lib/sociella-server-stack';

const app = new cdk.App();
new SociellaServerStack(app, 'SociellaServerStack');
